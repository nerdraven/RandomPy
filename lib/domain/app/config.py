import os

class Config(object):
  SECRET_KEY = os.environ.get("SECRET_KEY", None)
  SIZE = 4

  REDIS_HOST = os.environ.get("REDIS_HOST", "localhost")
  REDIS_PORT = os.environ.get("REDIS_PORT", 6379)


def get_config():
  return Config()