/**
 * @jest-environment node
 */

import { getSteamMiniProfile } from '../src/steamprofile'


describe('get mini profile', () => {
    it('mini steam profile link', async () => {
        const link = await getSteamMiniProfile('http://steamcommunity.com/id/alecboi')
        expect(link).toEqual('100844742')
    });

    it('steam profile link error', async () => {
        expect(getSteamMiniProfile('http://steam.com/fasfas/fsafsa')).rejects.toEqual('Wrong link');
    })
})