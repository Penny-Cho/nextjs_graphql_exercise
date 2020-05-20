import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import withApollo from "@/hoc/withApollo";
import { useState, useEffect } from "react";
import { useLazyGetUser } from "../../apollo/actions";

const AppLink = ({ children, href, as, className }) => (
    <Link href={href} as={as}>
        <a className={className}>{children}</a>
    </Link>
);

const AppNavbar = () => {
    const [user, setUser] = useState(null);
    const [hasResponse, setHasResponse] = useState(false);
    const [getUser, { data, error }] = useLazyGetUser();

    useEffect(() => {
        getUser();
    }, []);

    if (data) {
        if (data.user && !user) {
            setUser(data.user);
        }
        if (!data.user && user) {
            setUser(null);
        }
        if (!hasResponse) {
            setHasResponse(true);
        }
    }

    return (
        <div className="navbar-wrapper">
            <Navbar expand="lg" className="navbar-dark fj-mw9">
                <AppLink
                    href="/"
                    className="mr-3 font-weight-bold navbar-brand"
                >
                    Penny
                </AppLink>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <AppLink href="/portfolios" className="nav-link mr-3">
                            Portfolios
                        </AppLink>
                        <AppLink
                            href="/forum/categories"
                            className="nav-link mr-3"
                        >
                            Forum
                        </AppLink>
                        <AppLink href="/cv" className="mr-3 nav-link">
                            CV
                        </AppLink>
                    </Nav>
                    {hasResponse && (
                        <Nav>
                            {user && (
                                <>
                                    <span className="nav-link mr-4">
                                        Welcome {user.username}
                                    </span>
                                    <NavDropdown
                                        title="관리"
                                        className="mr-4"
                                        id="basic-nav-dropdown"
                                    >
                                        {(user.role === "admin" ||
                                            user.role === "instructor") && (
                                            <>
                                                <AppLink
                                                    href="/portfolios/new"
                                                    className="dropdown-item"
                                                >
                                                    포트폴리오 생성
                                                </AppLink>
                                                <AppLink
                                                    href="/instructor/[id]/dashboard"
                                                    as={`/instructor/${user._id}/dashboard`}
                                                    className="dropdown-item"
                                                >
                                                    대시보드
                                                </AppLink>
                                            </>
                                        )}
                                    </NavDropdown>
                                    <AppLink
                                        href="/logout"
                                        className="nav-link btn btn-secondary"
                                    >
                                        Sign Out
                                    </AppLink>
                                </>
                            )}
                            {(error || !user) && (
                                <>
                                    <AppLink
                                        href="/login"
                                        className="mr-3 nav-link"
                                    >
                                        Sign In
                                    </AppLink>
                                    <AppLink
                                        href="/register"
                                        className="mr-3 btn btn-success bg-green-2 bright"
                                    >
                                        Sign Up
                                    </AppLink>
                                </>
                            )}
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default withApollo(AppNavbar);
