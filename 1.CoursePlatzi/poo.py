class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f'Hello, my name is {self.name} and I am {self.age} years old')

person1 = Person('David', 35)
person2 = Person('Luis', 25)

person1.greet()
person2.greet()
