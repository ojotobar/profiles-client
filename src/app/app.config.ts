import { ApplicationConfig, provideZoneChangeDetection, inject, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, DefaultOptions, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { QuillModule } from 'ngx-quill';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(QuillModule.forRoot()),
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(),
    provideApollo(() => {
      const url = 'https://localhost:7051/profilesql';
      const httpLink = inject(HttpLink);
    
      const defaultOptions: DefaultOptions = {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        },
      }
    
      const authLink = setContext((operation, context) => {
        const token = localStorage.getItem('accessToken');

        return {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            'GraphQL-Preflight': 1,
          },
        };
      });

      const uploadLink = createUploadLink({
        uri: url,
      });

      const link = ApolloLink.split(
        (operation) => {
          const { variables } = operation;
          return containsFile(variables);
        },
        uploadLink,
        httpLink.create({ uri: url })
      );

      return {
        link: ApolloLink.from([authLink, link]), // Combine links
        cache: new InMemoryCache(),
        defaultOptions: defaultOptions,
      };
    })
  ]
};

function containsFile(variables: any): boolean {
  if (!variables || typeof variables !== 'object') return false;

  return Object.values(variables).some((value) => {
    if (value instanceof File || value instanceof Blob) return true;
    if (Array.isArray(value)) return value.some((v) => v instanceof File || v instanceof Blob);
    if (typeof value === 'object') return containsFile(value); // Recursively check nested objects
    return false;
  });
}