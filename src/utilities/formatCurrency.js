export function formatCurrency(number) {
    let num = parseFloat(number)
    num = num.toFixed(2)
    return `AU$${num}`
}