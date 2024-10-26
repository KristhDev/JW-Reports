import { DeviceInfo, storage } from '@infrasturcture/adapters';

export const storageSpy = {
    getItem: jest.spyOn(storage, 'getItem'),
    setItem: jest.spyOn(storage, 'setItem')
}

export const DeviceInfoSpy = {
    getBuildVersion: jest.spyOn(DeviceInfo, 'getBuildVersion').mockImplementation(() => '9102'),
    getSystemVersion: jest.spyOn(DeviceInfo, 'getSystemVersion').mockImplementation(() => '12')
}