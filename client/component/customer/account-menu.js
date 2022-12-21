import Link from "next/link";

const itemCss = "p-2 my-list-item";

function AccountMenu({ current }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header">
        <h4 className="mb-0 fw-semibold py-2">Akun</h4>
      </div>
      <div className="card-body">
        <div className="d-flex flex-column">
          <Link href="/account/profile">
            <a className={itemCss + (current == "profile" ? " active" : "")}>
              Profil Saya
            </a>
          </Link>

          <Link href="/account/current-orders">
            <a
              className={
                itemCss + (current == "current-orders" ? " active" : "")
              }
            >
              Riwayat Belanja
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountMenu;