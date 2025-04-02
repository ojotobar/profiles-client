declare module 'apollo-upload-client/createUploadLink.mjs' {
    import { ApolloLink } from '@apollo/client/core';
    interface UploadLinkOptions {
      uri?: string;
      fetch?: typeof fetch;
      headers?: Record<string, string>;
      credentials?: string;
    }
    export default function createUploadLink(options?: UploadLinkOptions): ApolloLink;
}  