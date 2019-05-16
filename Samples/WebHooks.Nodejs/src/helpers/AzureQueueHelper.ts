import { IConfig } from '../Interfaces/IConfig';
import * as storage from 'azure-storage';

export default class AzureQueueHelper {
    private config: IConfig;
    private queueService;

    constructor(config: IConfig) {
        this.config = config;
    }

    // Read configuration file to retrieve credentials such as account name and account key
    public initConfig() {
        if (this.config.azureQueueConfig.useDevelopmentStorage) {
            // use the Storage Emulator if this option is specified
            // note that the Storage Emulator must be running for the sample to succeed
            this.config.azureQueueConfig.useDevelopmentStorage = storage.generateDevelopmentStorageCredentials();
        }

        if (this.config.azureQueueConfig.connectionString) {
            this.queueService = storage.createQueueService(this.config.azureQueueConfig.connectionString);
          } else {
            this.queueService = storage.createQueueService(this.config.azureQueueConfig.accountName, this.config.azureQueueConfig.accountKey);
          }

    }
}