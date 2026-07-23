import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'
import { Button } from './button'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Contact Request</CardTitle>
        <CardDescription>We'll get back to you shortly.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Card body content goes here.</p>
      </CardContent>
      <CardFooter className="gap-3">
        <Button>Submit</Button>
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  ),
}

export const Feature: Story = {
  render: () => (
    <Card className="feature-card w-80">
      <CardHeader>
        <CardTitle className="display-title text-xl">Themed card</CardTitle>
        <CardDescription>Uses the app's island styling.</CardDescription>
      </CardHeader>
    </Card>
  ),
}
