class Globals{

}

class DevelopmentGlobals extends Globals {
  public urls = {
    users: "http://localhost:8080/api/auth/",
    companies: "http://localhost:8080/api/admin/company/",
    customers: "http://localhost:8080/api/admin/customer/",
    company: "http://localhost:8080/api/company/",
    customer: "http://localhost:8080/api/customer/",
    coupons: "http://localhost:8080/api/coupons/",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    users: "http://localhost:8080/api/auth/",
    companies: "http://localhost:8080/api/admin/company/",
    customers: "http://localhost:8080/api/admin/customer/",
    company: "http://localhost:8080/api/company/",
    customer: "http://localhost:8080/api/customer/",
    coupons: "http://localhost:8080/api/coupons/",
  };
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;

export default globals;