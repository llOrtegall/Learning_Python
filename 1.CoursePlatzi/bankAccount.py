class BankAccount:
    def __init__(self, accoun_holder, balance):
        self.accoun_holder = accoun_holder
        self.balance = balance
        self.is_active = True
    
    def deposit (self, amount):
        if self.is_active:
            self.balance += amount
            print(f'${amount} has been deposited to your account. Your new balance is ${self.balance}')
        else:
            return 'Account is closed'


        