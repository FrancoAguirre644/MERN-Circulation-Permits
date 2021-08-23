var QRCode = require('qrcode.react');

const QR = ({value}) => {
    return (
        <QRCode value={`http://localhost:3000/validation/qr/${value}`} />
    )
}

export default QR