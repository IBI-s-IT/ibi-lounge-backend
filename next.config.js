/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            { source: '/schedules', destination: '/api/schedules' },
            { source: '/grades', destination: '/api/grades' },
            { source: '/levels', destination: '/api/levels' },
            { source: '/groups', destination: '/api/groups' },
            { source: '/calendar', destination: '/api/calendar' },
        ]
    },
    experimental: {
        instrumentationHook: true,
    }
}

module.exports = nextConfig