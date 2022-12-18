import React, { useState,useEffect } from 'react';
import Web3Modal from 'web3modal';
import WalletConnect from "@walletconnect/web3-provider";
import detectEthereumProvider from '@metamask/detect-provider'
import { Contract, ethers } from 'ethers';
import { ABI, contractAddress } from '../Constants/Constants';

const WXDC = () => {

// ########################################################################
// ########################################################################

  const [provider, setProvider] = useState(null)
  const [address, setAddress] = useState(null)

  const web3Modal = new Web3Modal({
    cacheProvider: true,
    disableInjectedProvider: true,
    providerOptions: {
        walletconnect: {
            package: WalletConnect, // required
            options: {
                infuraId: "", // Required
                network: "mainnet",
                qrcodeModalOptions: {
                    mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"]
                }
            }
        },
        'custom-xdc': {
            display: {
                name: 'XDC Pay',
                logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2634.png',
                description: 'Connect with XDC Pay'
            },
            package: detectEthereumProvider,
            connector: async (_detectEthereumProvider) => {
                const provider = await _detectEthereumProvider();
                console.log("provider", provider)
                await provider.enable();
                return provider;
            }
        },
    },
});

const onConnect = async () => {
  try {
      const instance = await web3Modal.connect();
      const providerConnect = new ethers.providers.Web3Provider(instance);
      setProvider(providerConnect)

  } catch (err) {
      console.log("err", err)
  }
}
useEffect( () => {
    onConnect()
} ,[])

// ########################################################################
// ########################################################################


    const getNum = async() => {

        const signer = provider.getSigner();
        const address = await signer.getAddress();

        const contractInstance = new ethers.Contract(contractAddress, ABI, signer)
        const num = await contractInstance.x()
        console.log("X:- ", num.toString())

    }

    const setNum = async() => {
      const signer = provider.getSigner();
        const address = await signer.getAddress();

        const contractInstance = new ethers.Contract(contractAddress, ABI, signer)

        const set = await contractInstance.setNum(65);
        console.log("address:- ", address)   
    }

    return (
        <div align="center">

            <button onClick={getNum}>Get Num</button>
            <button onClick={setNum}>Set Num</button>

        </div>
    );
}


export default WXDC