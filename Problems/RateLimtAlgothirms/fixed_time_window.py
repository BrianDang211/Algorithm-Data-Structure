import time
from collections import defaultdict

class FixedWindowRateLimiter:
      def __init__(self, threshold, window_size):
            """
            Initialize the rate limiter.
            :param threshold: Maximum number of requests allowed per window.
            :param window_size: Time window size in seconds.
            """
            self.threshold = threshold
            self.window_size = window_size
            self.windows = defaultdict(int)  # A dictionary to track request counts per window

      def get_window_key(self):
            """
            Get the current time window key.
            :return: The integer key of the current time window.
            """
            current_time = int(time.time())  # Current epoch time in seconds
            print("current time: ")
            print(current_time)
            key_window = current_time // self.window_size
            print("Window key: ")
            print(key_window)
            return current_time // self.window_size

      def is_request_allowed(self):
            """
            Check if a request is allowed based on the current window.
            :return: True if the request is allowed, otherwise False.
            """
            window_key = self.get_window_key()
            if self.windows[window_key] < self.threshold:
                  self.windows[window_key] += 1
                  return True  # Request is allowed
            else:
                  return False  # Request is rejected

# Example usage:
rate_limiter = FixedWindowRateLimiter(threshold=5, window_size=60)  # 5 requests per 60 seconds

# Simulate incoming requests
for i in range(10):
      time.sleep(6)  # Simulate a 6-second gap between requests
      if rate_limiter.is_request_allowed():
            print(f"Request {i + 1}: Allowed")
      else:
            print(f"Request {i + 1}: Rejected")
