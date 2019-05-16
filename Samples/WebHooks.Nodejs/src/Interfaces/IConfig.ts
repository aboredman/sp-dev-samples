export interface IConfig {
    adalConfig: IAdalConfig;
    webhookConfig: IWebhookConfig;
    azureQueueConfig: IAzureQueueConfig;
}

export interface IAdalConfig {
    authority: string;
    clientID: string;
    subscriptionUrl: string;
    resource: string;
    fingerPrint: string;
}

export interface IWebhookConfig {
    url: string;
    listName: string;
    clientState: string;
}

export interface IAzureQueueConfig {
    useDevelopmentStorage: boolean;
    connectionString: string;
    accountName: string;
    accountKey: string;
}
