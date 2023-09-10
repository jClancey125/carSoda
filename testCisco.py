from netmiko import ConnectHandler
import getpass

cisco1 = {
    "device_type": "cisco_ios",
    "host": "134.6.208.41",
    "username": "jclancey",
    "password": "Gr@n1te!",
}

#commands = {'sh int desc'}

with ConnectHandler(**cisco1) as net_connect:
    output = net_connect.send_command('sh int desc')

print()
print(output)
print()
