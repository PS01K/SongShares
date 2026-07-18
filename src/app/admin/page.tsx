'use client'

import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import axios from 'axios';
import AdminTokenCard from '@/components/cards/AdminTokenCard';

const Page = () => {
    const [currentAddress, setCurrentAddress] = useState<string | null>(null);
    const [releasedTokens, setReleasedTokens] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                console.log('curr address', address);
                setCurrentAddress(address);
            } else {
                alert('MetaMask not detected. Please install MetaMask.');
            }
        };

        init();
    }, []);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await axios.get('/api/getTokensToDistribute');
                console.log('data', response.data);
                setReleasedTokens(response.data.mintedTokens);
            } catch (error) {
                console.error('Error fetching tokens:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTokens();
    }, []);

    if (loading) {
        return <div className="text-white text-center mt-20">Loading...</div>;
    }

    // IMPORTANT: Hardcoded address
    if (currentAddress !== "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266") {
        return (
            <div className="flex items-center justify-center h-screen bg-[#18181a]">
                <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
            </div>
        );
    }

    return (
        <div className="p-8 min-h-screen bg-[#18181a]">
            <h1 className="text-4xl font-bold mb-8 text-white">Admin Page</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-24">
                {releasedTokens.map((token, index) => (
                    <AdminTokenCard
                        key={index}
                        tokenId={token.tokenId}
                        tokenName={token.tokenName}
                        imageUrl={`https://emerald-persistent-platypus-879.mypinata.cloud/ipfs/${token.tokenThumbail}`}
                        isReleased={token.isReleased}
                        tokenPrice={token.tokenPrice}
                        availableToken={token.availableToken}
                    />
                ))}
            </div>
        </div>
    )
}

export default Page;
