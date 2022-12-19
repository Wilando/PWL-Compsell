import Link from "next/link";

function PricingCard({ data, pricingOnly, children }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="vstack gap-2">
          <div className="d-flex justify-content-between">
            <span className="h5">Total:</span>
            <span className="fw-bold h5 mb-0">32,000 Ks</span>
          </div>

          {!pricingOnly && (
            <div className="d-grid gap-2 mt-2">
              <Link href="/checkout/delivery-info">
                <a className="btn btn-success">Checkout</a>
              </Link>
              <Link href="/">
                <a className="btn btn-outline-success">Lanjutkan Belanja</a>
              </Link>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default PricingCard;