from netmiko import ConnectHandler
import getpass

cisco1 = {
    "device_type": "cisco_ios",
    "host": "192.168.172.139",
    "username": "assHole",
    "password": "assHole",
}

commands = {'sh int desc'}

with ConnectHandler(**cisco1) as net_connect:
    output = net_connect.send_command('sh int desc')

print()
print(output)
print()