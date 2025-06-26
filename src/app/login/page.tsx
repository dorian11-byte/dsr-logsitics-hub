import { LoginForm } from '@/components/dsr/auth/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Package size={32} />
          </div>
          <CardTitle className="font-headline text-3xl tracking-tight text-primary">DSR Logistics Hub</CardTitle>
          <CardDescription className="text-muted-foreground">Secure login for authorized personal</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} DSR Logistics. All rights reserved.</p>
      </footer>
    </main>
  );
}
