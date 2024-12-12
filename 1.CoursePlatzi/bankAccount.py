class BankAccount:
    def __init__(self, accoun_holder, balance):
        self.accoun_holder = accoun_holder
        self.balance = balance
        self.is_active = True

    def deposit(self, amount):
        if self.is_active:
            self.balance += amount
            print(
                f"${amount} has been deposited to your account. Your new balance is ${self.balance}"
            )
        else:
            return "Account is closed"

    def withdraw(self, amount):
        if self.is_active:
            if amount <= self.balance:
                self.balance -= amount
                print(
                    f"Service withdraw for: ${amount}. Your new balance is ${self.balance}"
                )
            else:
                print("Insufficient funds")

    def deactivate(self):
        self.is_active = False
        print("Account is closed")


acount1 = BankAccount("Juan", 1000)
acount1.deposit(200)
acount1.withdraw(500)
acount1.deactivate()
print("====================================================================")
acount2 = BankAccount("Pedro", 500)
acount2.deposit(100)
acount2.withdraw(200)
acount2.deactivate()
