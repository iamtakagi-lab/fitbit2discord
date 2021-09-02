import fs from 'fs'

export default class Credential {

    accessToken: string = ""
    refreshToken: string = ""

    constructor() {
        const storedCredential = JSON.parse(
            fs.readFileSync(__dirname + '/data/credential.json', 'utf8')
        )

        const { accessToken, refreshToken } = storedCredential

        if (
            accessToken == null ||
            refreshToken == null ||
            accessToken.length <= 0 ||
            refreshToken.length <= 0
        )
            return

        if (accessToken != null && refreshToken != null) {
            this.setAccessToken(accessToken)
            this.setRefreshToken(refreshToken)
        }
    }

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken
    }

    setRefreshToken(refreshToken: string) {
        this.refreshToken = refreshToken
    }

    resetCredential() {
        this.accessToken = ""
        this.refreshToken = ""
    }

    save() {
        fs.writeFileSync(__dirname + '/data/credential.json', JSON.stringify({ accessToken: this.accessToken, refreshToken: this.refreshToken }))
    }
}