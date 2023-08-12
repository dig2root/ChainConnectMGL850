import { Contract } from '@ethersproject/contracts'
import configuration from '../../../../Users.json'

const wethInterface = configuration.abi
const wethContractAddress = configuration.networks["5777"].address;

export const contract = new Contract(wethContractAddress, wethInterface)