'use server';

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {


    try {
        
        const address = await prisma.userAddress.findUnique({
            where: {userId}
        })

        if( !address ) return null;

        const { citiesId, address2, phone, ...rest } = address;

        return {
            ...rest,
            address2: address2 ? address2 : '',
            phone: phone ? phone : '',
            city: citiesId,
        };
        
    } catch (error) {
        console.log(error);
        return null;
    }
    
}