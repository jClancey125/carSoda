import meraki

API_KEY = '799fc56a283a84a80685d6f7d467da6d51cac932'

dashboard = meraki.DashboardAPI(API_KEY)

response = dashboard.organizations.getOrganizations()

print(response)
