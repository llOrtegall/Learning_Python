try:
    divisor = int(input('Ingresa un número divisor: '))
    result = 100 / divisor
    print(result)
except ZeroDivisionError as e:
    print('No se puede dividir por cero')
    print(e)
except ValueError as e:
    print('Debes ingresar un número')
    print(e)
finally:
    print('Process finished')

