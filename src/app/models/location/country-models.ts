export interface CountryDataModel{
    Data: CountryModel[],
    MetaData: MetaDataModel
}

export interface CountryModel{
    Id: string,
    Name: string,
    Latitude: string,
    Longitude: string,
    Emoji: string,
    EmojiUnicode: string,
    ISO2: string,
    ISO3: string
}

export interface MetaDataModel{
    Page: number,
    Pages: number,
    Size: number,
    Count: number,
    HasPrevious: boolean,
    HasNext: boolean
}

export interface StateModel {
    Id: string,
    CountryId: string,
    Name: string,
    CountryCode: string,
    ISO2: string,
    Latitude: string,
    Longitude: string
}