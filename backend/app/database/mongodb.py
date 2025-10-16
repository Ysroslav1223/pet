from pymongo import MongoClient
import os
from dotenv import load_dotenv


load_dotenv()

class MongoDB:
    def __init__(self):
        self.client = None
        self.database = None

    def connect(self):
        try:
            self.client = MongoClient(os.getenv('MONGODB_URL'))
            self.database = self.client[os.getenv('DATABASE_NAME')]
            print('connection+')
        except Exception as e:
            print('no connection - ',{e})
    
    def close(self):
        if self.client:
            self.client.close()

mongodb = MongoDB()

if __name__ == "__main__":
    mongodb.connect()