import { calculateAge,isMatchPassword } from '@/utils/helperFunction';

import { describe, expect, it } from 'vitest'

describe('Helper Function Test', () => {
  it('calculateAge', () => { 
    expect(calculateAge('1996-05-20')).toMatchInlineSnapshot('27');
  })

  it('isMatchPassword', () => { 
    expect(isMatchPassword('200596','200596')).toBeTruthy();
  })
})