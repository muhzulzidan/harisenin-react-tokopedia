import React from 'react';
import { Footer as FlowbiteFooter, Flowbite } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';

const customTheme: CustomFlowbiteTheme = {
    footer: {
        root: {
            base: "w-full max-w-screen-lg mx-auto border-0 rounded-none bg-stone-50 shadow-none dark:bg-stone-900 md:flex md:items-center md:justify-between ",
        },


    },

};


const Footer: React.FC = () => {
    return (
        <>
            <Flowbite theme={{ theme: customTheme }}  >
                <FlowbiteFooter container>
                    <FlowbiteFooter.Copyright
                        by="muhammad zulzidan"
                        href="zulzidan.com"
                        year={2023}
                    />
                    <FlowbiteFooter.LinkGroup>
                        <FlowbiteFooter.Link className='' href="#">
                            About
                        </FlowbiteFooter.Link>
                        <FlowbiteFooter.Link href="#">
                            Privacy Policy
                        </FlowbiteFooter.Link>
                        <FlowbiteFooter.Link href="#">
                            Licensing
                        </FlowbiteFooter.Link>
                        <FlowbiteFooter.Link href="#">
                            Contact
                        </FlowbiteFooter.Link>
                    </FlowbiteFooter.LinkGroup>
                </FlowbiteFooter>
            </Flowbite>
        </>
    );
};

export default Footer;
