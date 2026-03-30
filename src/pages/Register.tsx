import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function Register() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="RentEasy" className="w-16 h-16 mx-auto mb-4 rounded-xl" />
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <p className="text-muted-foreground text-sm mt-1">Start managing your rentals with RentEasy</p>
        </div>
        <div className="glass-card p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">First Name</label>
              <input placeholder="Jean" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Last Name</label>
              <input placeholder="Dupont" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Confirm Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm border border-border outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground" />
          </div>
          <Link to="/" className="block w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium text-center hover:opacity-90 transition-opacity">
            Create Account
          </Link>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:opacity-80">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
