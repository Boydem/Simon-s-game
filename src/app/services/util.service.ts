async function delay(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time))
}

export const utilService = {
    delay,
}
