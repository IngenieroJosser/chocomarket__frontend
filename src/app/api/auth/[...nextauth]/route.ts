import NextAuth from "next-auth"
import { authOptions } from '@/services/auth/authService'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
