import { IConfig } from '../Interfaces/IConfig';
import * as storage from 'azure-storage';

export default class AzureQueueHelper {
  private config: IConfig;
  private queueService: storage.QueueService;

  constructor(config: IConfig) {
    this.config = config;
    this.init();
  }

  // Read configuration file to retrieve credentials such as account name and account key
  public init() {
    if (this.config.azureQueueConfig.useDevelopmentStorage) {
      // use the Storage Emulator if this option is specified
      // note that the Storage Emulator must be running for the sample to succeed
      this.config.azureQueueConfig.connectionString = storage.generateDevelopmentStorageCredentials();
    }

    if (this.config.azureQueueConfig.connectionString) {
      this.queueService = storage.createQueueService(this.config.azureQueueConfig.connectionString);
    } else {
      this.queueService = storage.createQueueService(this.config.azureQueueConfig.accountName, this.config.azureQueueConfig.accountKey);
    }

    this.queueService.createQueueIfNotExists(this.config.azureQueueConfig.queueName, function (error) {
      if (error) {
        console.log('TODO: Houston we have a problem');
        throw error;
      }
    });

  }

  public addMessage(messageContent: string): void {

    this.queueService.createMessage(this.config.azureQueueConfig.queueName, messageContent, function (error, result, response) {
      if (error) {
        console.log("Error adding message to queue");
        throw error;
      }
      else {
        console.log("Message added to queue");
      }
    });
  }

  public getMessage(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queueService.getMessage(this.config.azureQueueConfig.queueName, function (error, result) {
        if (error) {
          console.log("Error retreiving message from queue");
          reject(error);
        }
        else {
          console.log("Message retreived from queue");
          resolve(result.messageText);
        }
      });
    });
  }

}