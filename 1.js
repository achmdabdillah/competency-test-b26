class Quality {
    constructor(price){
        this.price = price;
    }
}

const A = new Quality (4550);
const B = new Quality (5330);
const C = new Quality (8653);

function hitungBarang(quality, quantity){
    switch(quality) {
        case A : if(quantity > 13) 
                {
                    const total = A.price * quantity;
                    const discount = quantity * 231;
                    const payment = total-discount;
                    console.log(`-Total harga barang : ${total}`)
                    console.log(`-Potongan : ${discount}`)
                    console.log(`-Total yang harus dibayar : ${payment}`)
                    break;
                }
                const totalA = A.price * quantity;
                console.log(`harga barang : ${totalA}`)
                break;

        case B : if(quantity > 7)
                {
                    const total = B.price * quantity
                    const discount = quantity * Math.floor((B.price * 0.23))
                    const payment = total - discount;
                    console.log(`-Total harga barang : ${total}`)
                    console.log(`-Potongan : ${discount}`)
                    console.log(`-Total yang harus dibayar : ${payment}`)
                    break
                }
                const totalB = B.price * quantity;
                console.log(`harga barang : ${totalB}`)
                break;

        case C : const totalC = C.price * quantity
                console.log(`harga barang : ${totalC})
                break;
            
    }
}
