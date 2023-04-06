import requests
import os

class ArgosApi:
    def __init__(self, EMAIL, PASSWORD):
        print(EMAIL, PASSWORD)
        self.argos_core_host = 'https://argos-core.ricardoromo.co/api/v1'
        self.argos_history_host = 'https://argos-history.ricardoromo.co/api/v1'
        # self.argos_core_host = 'http://127.0.0.1:5001/api/v1'
        # self.argos_history_host = 'http://127.0.0.1:8080/api/v1'
        self.token = None
        self.beare_token = None
        self.__authenticate(EMAIL, PASSWORD)

    def __authenticate(self, EMAIL, PASSWORD):
        result = requests.post(
            f'{self.argos_core_host}/session/login', data={'email': EMAIL, 'password': PASSWORD})
        self.token = result.json()['data']['token']
        self.beare_token = f'Bearer {self.token}'
        print(self.beare_token)

    def get_devices(self):
        result = requests.get(
            f'{self.argos_core_host}/device', headers={'Authorization': self.beare_token})
        device_res = result.json()['data']
        devices = [ {'name': x['name'], 'id':x['idDevice']} for x in device_res]
        return devices

    def get_houses(self):
        headers = {'authorization': self.beare_token,
                   'content-type': 'application/json'}
        result = requests.get(
            f'{self.argos_history_host}/house', headers=headers)
        return result.json()

    def set_state(self, id, state):
        headers = {'authorization': self.beare_token,}
        url = f'{self.argos_core_host}/device/set_state?idDevice={id}&state={state}'
        result = requests.get(url, headers=headers)
        return result.json()

# if __name__ == '__main__':
#     argos_api = ArgosApi('jricardoromo21@gmail.com', 'hola')
#     device_res = argos_api.get_devices()['data']
#     devices = [ {'name': x['name'], 'id':x['idDevice']} for x in device_res]
#     print(devices) 
#     set_estate = argos_api.set_estate('10015da486', 'off')
#     print(set_estate)
