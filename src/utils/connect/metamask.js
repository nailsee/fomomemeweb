import { message } from "antd";
import { Type, web3 } from "../types";
import { useContext, useEffect } from "react";
import { PNft } from "../../App";
import { ProfileService } from "../../request/api";
import { useSDK } from '@metamask/sdk-react';


export const useMetamask = () => {
  const { state, dispatch } = useContext(PNft);
  const { sdk, chainId, account } = useSDK();
  const updateAddress = async (_address) => {
    if (!_address) {
      return
    }
    dispatch({
      type: Type.SET_ADDRESS,
      payload: {
        address: _address
      }
    });
    const account = await ProfileService({
      user_address: _address
    });
    dispatch({
      type: Type.SET_ACCOUNT,
      payload: {
        account: account.data
      }
    });
  };
  const updateNetwork = async (_chain) => {
    if (!_chain) {
      return
    }
    dispatch({
      type: Type.SET_CHAIN,
      payload: {
        chain: web3.utils.hexToNumberString(_chain)
      }
    });
  };
  //Connect Wallet
  const connectMetamask = async () => {
    if (!window?.ethereum) {
      message.error('reject');
      return
    };
    try {
      const result = await sdk?.connect();
      dispatch({
        type: Type.SET_EVM,
        payload: {
          evm:'0'
        }
      })
      dispatch({
        type: Type.SET_WALLET,
        payload: {
          wallet: 'metamask'
        }
      })
      updateAddress(result?.[0]);
      updateNetwork(chainId )
      const balance = await web3.eth.getBalance(result?.[0]);
      dispatch({
        type: Type.SET_BALANCE,
        payload: {
          balance: String((+balance / 1e18).toFixed(4))
        }
      })
    } catch (err) {
      message.error(err.message);
      // switch (err.code) {
      //     case 4001:
      //         message.warning('You have deauthorized')
      //         break;
      //     default:
      //         message.warning('Network Error')
      // }
    }
  }
  useEffect(() => {
    if (state.wallet === 'metamask') {
      updateNetwork(chainId ? chainId : '');
      updateAddress(account ? account : '');
      const next = async () => {
        const balance = await web3.eth.getBalance(account as string);
        dispatch({
          type: Type.SET_BALANCE,
          payload: {
            balance: String((+balance / 1e18).toFixed(4))
          }
        })
      };
      account && next();
    }
  }, [account, chainId])
  return {
    connectMetamask
  }
};
