import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./db"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null
                const user = await prisma.user.findUnique({ where: { email: credentials.email } })
                if (user && user.password === credentials.password) {
                    return { id: user.id, email: user.email, role: user.role }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) token.role = user.role
            return token
        },
        async session({ session, token }: any) {
            if (session.user) session.user.role = token.role
            return session
        }
    }
}
