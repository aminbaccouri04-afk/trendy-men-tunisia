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
                    return { id: user.id, email: user.email, name: user.name, role: user.role }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
                token.name = user.name;
            }
            return token
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.role = token.role;
                session.user.name = token.name;
            }
            return session
        }
    }
}
