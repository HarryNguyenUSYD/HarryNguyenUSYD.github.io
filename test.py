class TwoNumbers:
    def __init__(self, a, b):
        self.a = a
        self.b = b
    
    def get_average(self):
        return (self.a + self.b) / 2
    
    # Equal to ==
    def __eq__(self, other):
        # Appropriate instance check
        if isinstance(other, TwoNumbers):
            return self.get_average() == other.get_average()
        return NotImplemented

    # Not equal to !=
    def __ne__(self, other):
        if isinstance(other, TwoNumbers):
            return self.get_average() != other.get_average()
        return NotImplemented

    # Less than <
    def __lt__(self, other):
        if isinstance(other, TwoNumbers):
            return self.get_average() < other.get_average()
        return NotImplemented

    # Less than or equal <=
    def __le__(self, other):
        if isinstance(other, TwoNumbers):
            return self.get_average() <= other.get_average()
        return NotImplemented

    # Greater than >
    def __gt__(self, other):
        if isinstance(other, TwoNumbers):
            return self.get_average() > other.get_average()
        return NotImplemented

    # Greater than or equal >=
    def __ge__(self, other):
        if isinstance(other, TwoNumbers):
            return self.get_average() >= other.get_average()
        return NotImplemented

no_1 = TwoNumbers(3, 5)
no_2 = TwoNumbers(1, 2)

print(no_1 > no_2)