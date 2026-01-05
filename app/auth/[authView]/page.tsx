import AuthLayout from "@/components/layout/AuthLayout";
import { AuthView } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"
import { LoginForm } from "@/features/auth/components/Login-form";
import { SignupForm } from "@/features/auth/components/Signup-form";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ authView: path }));
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ authView: string }>;
}) {
  const { authView } = await params;

  // Use custom LoginForm for sign-in, SignupForm for sign-up, Better Auth UI for other routes
  if (authView === "sign-in") {
    return (
      <main className="">
        <AuthLayout>
          <LoginForm />
        </AuthLayout>
      </main>
    );
  }

  if (authView === "sign-up") {
    return (
      <main className="">
        <AuthLayout>
          <SignupForm />
        </AuthLayout>
      </main>
    );
  }

  return (
    <main className="">
      <AuthLayout>
        <AuthView path={authView} />
      </AuthLayout>
    </main>
  );
}

// //my auth routes
// The newly created dynamic route covers the following paths by default:

// /auth/sign-in – Sign in via email/password and social providers
// /auth/sign-up – New account registration
// /auth/magic-link – Email login without a password
// /auth/forgot-password – Trigger email to reset forgotten password
// /auth/two-factor – Two-factor authentication
// /auth/recover-account – Recover account via backup code
// /auth/reset-password – Set new password after receiving reset link
// /auth/sign-out – Log the user out of the application
// /auth/callback – Internal route to handle Auth callbacks
// /auth/accept-invitation – Accept an invitation to an organization
// Ensure that any links to the authentication process utilize these routes accordingly. All routes will render the <AuthView /> component and automatically handle navigation and authentication flow.
