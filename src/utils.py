import os
import random

random.seed(os.urandom(16))

class IdGenerator:
  def generate(self):
    return random.randint(10000, 999999)