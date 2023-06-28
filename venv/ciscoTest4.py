#Will need to import netmiko for commands to allow interfacing into cisco devices., also getpass to ask user for password
import requests
from netmiko import ConnectHandler
from getpass import getpass
import json

#Defining some varibles needed in future
login = None
host = None
shIntList = None
listLength = None
speedDuplex = " "
currentIP = None
inputErrors = None
trafficIN = None
trafficOUT = None
macAddress = None
ouiResult = None



#Asking user for hostName of device
host = input('Please enter IP address: ')

#asking user for login
login = input('Please enter your username: ')

#using getpass function to ask using for password without outputting to screen
password = getpass(prompt= 'Please enter Password: ')

#Using Netmiko to define new router object, named routerJuan
routerJuan = ConnectHandler(
    device_type= "cisco_ios",
    host= host,
    username= login,
    password= password,
)
#Creating function that takes our string output from show int command, and converts to list uses simple loop, and if statements to check
#List elements for desired out
def searchIntList():

   #uses python method .splitLines to change String into list
    shIntList = showInt.splitlines()

   #uses python function len() to return length of list subtracts one due to lists index is 0
    listLength = len(shIntList) - 1

    #while loop to search through list elements, then uses if statements, and .find function to check if the list element contains the desired string
    #list was seperated by line breaks so once we find line we want, then store data in varibles from earlier
    #since we are doing this inside a function global must be place
    while listLength > 0:
        if shIntList[listLength].find("CRC") != -1:
            global inputErrors
            inputErrors = shIntList[listLength]
        if shIntList[listLength].find("Internet address") != -1:
            global currentIP
            currentIP = shIntList[listLength]
        if shIntList[listLength].find("input rate") != -1:
            global trafficIN
            trafficIN = shIntList[listLength]
        if shIntList[listLength].find("output rate") != -1:
            global trafficOUT
            trafficOUT = shIntList[listLength]
        if shIntList[listLength].find("TX/FX") != -1:
            global speedDuplex
            speedDuplex = shIntList[listLength]

        listLength = listLength - 1



#Creating variable command, and sending its value to the cisco routing using the connecthandler object we just made
command = routerJuan.send_command("show interface desc")

#printing show interface description
print(command)

#asking user what interface they would like to check
search = input("\nWhich interface would you like to check?: \n")

#creates string that will end up being show int with the users input added to complete the command
finalSearch = "show int " + search

#creates showInt variable storing the result of sending show interface command to router
showInt = routerJuan.send_command(finalSearch)

#invoking function created earlier
searchIntList()

#Printing various useful info from show interface command
print("\nInterface is currently configured for IP info below: \n")
print(currentIP)
print("\nInterface is currently using speed/duplex below:\n")
print(speedDuplex)
print("\nCurrent Input Ouput traffic of interface below: \n")
print(trafficIN)
print(trafficOUT)


searchIP = input ("\nPlease enter IP you wish to lookup: \n")
searchedIp = requests.get("http://ip-api.com/json/" + searchIP + "?fields=status,message,country,countryCode,region,regionName,city,zip,isp,org,as,query")
print(searchedIp.text)

input('\nPress Enter to move onto MAC address-table\n')

#send show mac address command and display output
macAddress = routerJuan.send_command("show mac address-table")
print(macAddress)

input('\nPress Enter to move onto ARP table\n')
#send show ARP command and display output
arp = routerJuan.send_command("show arp")
print(arp)

#Reachout to API for OUI lookup creates ouiResult variable using MAC defined by user
searchMAC = input("\nPlease input MAC for OUI lookup: \n")
ouiResult = requests.get("https://api.maclookup.app/v2/macs/" + searchMAC + "/company/name")
print(ouiResult)
print(ouiResult.text)


input('Press Enter to exit')
















