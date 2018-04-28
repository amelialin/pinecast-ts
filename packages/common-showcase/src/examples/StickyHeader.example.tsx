import * as React from 'react';

import Button from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import * as StickyHeader from '@pinecast/common/StickyHeader';
import styled from '@pinecast/styles';

import Toggler from '@pinecast/common/Toggler';

const Padding = styled('div', {padding: '0 20px 20px'});

export default {
  name: 'Sticky header',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Card style={{height: 300, overflow: 'auto', padding: 0}} whiteBack>
          <StickyHeader.Wrapper
            header={
              <StickyHeader.Header
                $headerHeight={60}
                style={{
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  fontSize: 18,
                }}
              >
                This is the header content
              </StickyHeader.Header>
            }
            headerHeight={50}
          >
            <Padding>
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.<br />
              This is the inner bit.
            </Padding>
          </StickyHeader.Wrapper>
        </Card>
      ),
    },
    {
      title: 'Key scroll on',
      render: () => (
        <Toggler>
          {({open, toggle}) => (
            <React.Fragment>
              <div>
                <Button onClick={toggle} style={{marginBottom: 8}}>
                  Toggle keys
                </Button>
              </div>
              <Card
                style={{height: 300, overflow: 'auto', padding: 0}}
                whiteBack
              >
                <StickyHeader.Wrapper
                  header={
                    <StickyHeader.Header
                      $headerHeight={60}
                      style={{
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,
                        fontSize: 18,
                      }}
                    >
                      This is the header content
                    </StickyHeader.Header>
                  }
                  headerHeight={50}
                  keyScrollOn={String(open)}
                >
                  <Padding>
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.<br />
                    This is the inner bit.
                  </Padding>
                </StickyHeader.Wrapper>
              </Card>
            </React.Fragment>
          )}
        </Toggler>
      ),
    },
  ],
};
