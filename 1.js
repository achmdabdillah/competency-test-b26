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
                    return `-Total harga barang : ${total}\n-Potongan : ${discount}\n-Total yang harus dibayar : ${payment}`
                    break;
                }
                const totalA = A.price * quantity;
                return `harga barang : ${totalA}`
                break;

        case B : if(quantity > 7)
                {
                    const total = B.price * quantity
                    const discount = quantity * Math.floor((B.price * 0.23))
                    const payment = total - discount;
                    
                    return `Total harga barang : ${total} 
                    Potongan : ${discount} 
                    Total yang harus dibayar : ${payment}`
                    break
                }
                const totalB = B.price * quantity;
                return `harga barang : ${totalB}`
                break;

        case C : const totalC = C.price * quantity
                return `harga barang : ${totalC}`
                break;
            
    }
}