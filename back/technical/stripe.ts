const stripe = require("stripe")("sk_test");

export const createCustomer = async ({token, email}: {token: string|number; email: string}) => {
  const customer = await stripe.customers.create({
    source: token,
    email
  });
  return customer
}

export const getSubscription = async ({subscriptionId}: {subscriptionId: string}) => {
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId
  );

  return subscription
}

export const getCustomer = async ({customerId}: {customerId: string}) => {
  const customer = await stripe.customer.retrieve(customerId);
  return customer;
}

export const updateCardForSubscription = async ({
  subscriptionId,
  token
} : {
  subscriptionId: string;
  token: string
}) => {
  const subscription = await getSubscription({subscriptionId});

  const card = await stripe.customers.createSource(
    subscription.customer,
    {source: token}
  );

  return await stripe.subscriptions.update(
    subscriptionId,
    {default_payment_method: card.id}
  );
}

export const updateEmailCustomerForSubscription = async ({
  subscriptionId,
  email
}: {
  subscriptionId: string;
  email: string;
}) => {
  const subscription = await getSubscription({subscriptionId});

  const customer = await stripe.customers.update(
    subscription.customer,
    {email}
  );

  return customer
}

export const createSubscription = async ({
  customerId,
  price,
  quantity
}: {
  customerId: string;
  price: number;
  quantity: number;
}) => {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {price, quantity},
    ],
  })

  return subscription;
}

export const updateQuantitySubscription = async ({
  subscriptionId,
  quantity
}: {
  subscriptionId: string;
  quantity: number;
}) => {
  const subscription = await stripe.subscriptions.update(
    subscriptionId,
    {items: [{quantity}]}
  );

  return subscription;
}

export const addOneMemberSubscription = async ({
  subscriptionId,
}: {
  subscriptionId: string;
}) => {
  const subscription = await getSubscription({subscriptionId});
  const newQuantity = subscription.items.data[0].quantity + 1;
  return updateQuantitySubscription({subscriptionId, quantity: newQuantity})
}

export const removeOneMemberSubscription = async ({
  subscriptionId,
}: {
  subscriptionId: string;
}) => {
  const subscription = await getSubscription({subscriptionId});
  const newQuantity = subscription.items.data[0].quantity - 1;
  return updateQuantitySubscription({subscriptionId, quantity: newQuantity})
}

export const deleteSubscription = async ({
  subscriptionId
}: {
  subscriptionId: string;
}) => {
  const deleted = await stripe.subscriptions.del(
    subscriptionId
  );
  return deleted;
}

export const chargeCustomByCard= async ({
  customerId,
  currency,
  amount
}: {
  customerId: string;
  currency: string;
  amount: number
}) => {
  const charge = await stripe.charges.create({
    amount,
    currency,
    customer: customerId
  });
  return charge
}