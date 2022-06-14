import Footer from '@/common/components/home/Footer';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { compileSchema } from 'ajv/dist/compile';
import Link from 'next/link';
import Home from 'pages';
import { FC, ReactNode, useState, useEffect } from 'react';

const LitJsSdk = require('lit-js-sdk');
const jwt_decode = require('jwt-decode');

async function test(){
const litNodeClient = new LitJsSdk.LitNodeClient()
litNodeClient.connect()

const accessControlConditions = [
  {
    contractAddress: '0x3110c39b428221012934A7F617913b095BC1078C',
    chain: 'solana',
    method: 'balanceOf',
    parameters: [
      ':userAddress',
      '9541'
    ],
    returnValueTest: {
      comparator: '>',
      value: '0'
    }
  }
]

const authSig = await LitJsSdk.checkAndSignAuthMessage({chain: 'solana'})
const resourceId = {
  baseUrl: 'localhost:3000',
  path: '/admin',
  orgId: "",
  role: "",
  extraData: ""
}
const chain = 'solana'
const {jwt} = await litNodeClient.getSignedToken({ accessControlConditions, chain, authSig, resourceId })
console.log(jwt+'code');
const { verified, header, payload } =  await LitJsSdk.verifyJwt({jwt})
const Home: FC = () => {
if (payload.baseUrl !== "localhost:3000" || payload.path !== "/admin" || payload.orgId !== "" || payload.role !== "" || payload.extraData !== "") {
    return (
      <div>
        <div className="container mx-auto w-[58%] md:w-9/4" style={{'marginTop': '190px', 'marginBottom': '190px', 'textAlign': 'center'}}>
          <h3> Secret Message to be accessed only by Authenticate</h3>
        </div>
        <Footer />
      </div>
    );
}
else{

  return (
    <div>
      <div className="container mx-auto w-[58%] md:w-9/4" style={{'marginTop': '190px', 'marginBottom': '190px', 'textAlign': 'center'}}>
        <h3> Secret Message to be accessed only by Authenticated users</h3>
      </div>
      <Footer />
    </div>
  );
};
}
}

test();
interface HomeLinkProps {
  href: string;
}



const InternalLink: FC<HomeLinkProps> = ({ href, children }) => (
  <Link href={href} passHref>
    <a
      href={href}
      className="flex flex-nowrap items-center stroke-gray-300 text-sm font-medium text-gray-300 hover:scale-105 hover:stroke-white hover:transition"
    >
      {children}
    </a>
  </Link>
);

const ExternalLink: FC<HomeLinkProps> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex flex-nowrap items-center stroke-gray-300 text-sm font-medium text-gray-300 hover:scale-105 hover:stroke-white hover:transition"
  >
    {children}
  </a>
);

const PageLeftButton = (
  <button className="absolute left-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-900 stroke-white p-1 shadow shadow-black transition hover:scale-125">
    <ChevronLeftIcon className="h-4 w-4" />
  </button>
);

const PageRightButton = (
  <button className="absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-900 stroke-white p-1 shadow shadow-black transition hover:scale-125">
    <ChevronRightIcon className="h-4 w-4" />
  </button>
);

type Header = FC;
type Title = FC;
type HeaderAction<T> = FC<T>;
type Body = FC;

type HomeSectionSubtypes = {
  Header: Header;
  Title: Title;
  HeaderAction: HeaderAction<HeaderActionProps>;
  Body: Body;
};

/**
 * Compound component for preview sections in the v2 homepage. Contains a title,
 * linked call to action, and body, e.g.
 *
 * ```
 *  <HomeSection>
 *      <HomeSection.Header>
 *          <HomeSection.Title>Holaplex Preview</HomeSection.Title>
 *          <HomeSection.HeaderAction newTab href="www.holaplex.com">Go home</HomeSection.HeaderAction>
 *      </HomeSection.Header>
 *      <HomeSection.Body>
 *          <SomeAmazingCustomContent/>
 *      </HomeSection.Body>
 *  </HomeSection>
 * ```
 */
export const HomeSection: FC & HomeSectionSubtypes = ({ children }) => (
  <div className="my-24 sm:my-40">{children}</div>
);

const HomeSectionHeader: Header = ({ children }) => (
  <div className="mb-4 flex flex-row items-center justify-between border-b border-gray-800 p-2">
    {children}
  </div>
);
HomeSection.Header = HomeSectionHeader;

const HomeSectionTitle: Title = ({ children }) => (
  <span className="text-lg font-medium text-white">{children}</span>
);
HomeSection.Title = HomeSectionTitle;

interface HeaderActionProps {
  href: string;
  external?: boolean;
}

const HomeSectionHeaderAction: HeaderAction<HeaderActionProps> = ({ href, external, children }) => {
  const LinkComponent: FC<HomeLinkProps> = external ? ExternalLink : InternalLink;
  return (
    <LinkComponent href={href}>
      {children}
      <ChevronRightIcon className="ml-2 h-4" />
    </LinkComponent>
  );
};
HomeSection.HeaderAction = HomeSectionHeaderAction;

/**
 * Container for main body of each home section. Add whatever content you want as children.
 */
const HomeSectionBody: Body = ({ children }) => <div>{children}</div>;
HomeSection.Body = HomeSectionBody;

type Item = FC<{ children: ReactNode | ReactNode[]; className?: string }>;

type HomeSectionCarouselSubtypes = {
  Item: Item;
};

interface HomeSectionCarouselProps {
  rows: number;
  cols: number;
  gap?: number;
}



export default Home;
