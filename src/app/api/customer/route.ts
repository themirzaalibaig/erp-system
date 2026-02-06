import { NextRequest } from 'next/server'
import { ApiResponse } from '@/lib/backend/apiResponse'
import { authCheck } from '@/lib/backend/auth'
import prisma from '@/lib/prisma'
import { getLanguage } from '@/lib/backend/serverCookie'
import { customerApiData } from '@/data'

export const GET = async (req: NextRequest) => {
	try {
		const user = await authCheck(req)
		if (!user) {
			return ApiResponse(false, 'Unauthorized', 401)
		}
		const lang = await getLanguage()
		const vm = customerApiData.all[lang]

		const customers = await prisma.customer.findMany({ where: { userId: user.id } })
		if (customers.length === 0) {
			return ApiResponse(false, vm.notFound, 404)
		}

		return ApiResponse(true, vm.found, 200, customers, { total: customers.length })
	} catch (error) {
		console.log('error', error)
		return ApiResponse(false, 'Internal server error', 500, [error])
	}
}

export const POST = async (req: NextRequest) => {
	try {
		const user = await authCheck(req)
		if (!user) {
			return ApiResponse(false, 'Unauthorized', 401)
		}
		const lang = await getLanguage()
		const vm = customerApiData.create[lang]
		const { name, email, phone, address } = await req.json()
		if (!name) {
			return ApiResponse(false, vm.requiredName, 400, [], { errors: { name: vm.requiredName } })
		}

		const customer = await prisma.customer.create({
			data: {
				name,
				email,
				phone,
				address,
				userId: user.id,
			},
		})
		return ApiResponse(true, vm.created, 200, customer)
	} catch (error) {
		console.log('error', error)
		return ApiResponse(false, 'Internal server error', 500, [error])
	}
}
