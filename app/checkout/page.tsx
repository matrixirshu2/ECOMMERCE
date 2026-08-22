'use client';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, MapPin } from 'lucide-react';
import { defaultProducts, money } from '../store';

export default function Checkout(){
  const [cart,setCart]=useState<Record<string,number>>({});
  const [done,setDone]=useState(false);
  const [method,setMethod]=useState('cod');
  const [form,setForm]=useState({name:'',phone:'',email:'',address:'',city:'',pincode:''});
  useEffect(()=>{try{setCart(JSON.parse(localStorage.getItem('ecommerce-cart-v1')||'{}'))}catch{}}
  ,[]);
  const items=defaultProducts.filter(p=>cart[p.id]);
  const subtotal=useMemo(()=>items.reduce((s,p)=>s+p.price*cart[p.id],0),[items,cart]);
  const shipping=subtotal>=999||subtotal===0?0:99; const total=subtotal+shipping;
  const submit=()=>{if(!form.name||!form.phone||!form.address||!form.city||!form.pincode||items.length===0)return; const order={id:`ORD-${Date.now()}`,date:new Date().toISOString(),items,quantities:cart,total,method,customer:form,status:'Pending'};localStorage.setItem('ecommerce-last-order-v1',JSON.stringify(order));localStorage.removeItem('ecommerce-cart-v1');setDone(true)};
  if(done)return <main className="container checkout-page"><div className="success"><CheckCircle2 size={58}/><h1>Order placed!</h1><p>Your order has been recorded successfully.</p><a className="btn dark" href="/orders">View order</a></div></main>;
  return <main className="container checkout-page"><a href="/" className="back"><ArrowLeft size={17}/> Back to store</a><h1>Checkout</h1>{items.length===0?<div className="empty">Your cart is empty. <a href="/">Continue shopping</a></div>:<div className="checkout-grid"><section className="checkout-card"><h2><MapPin size={20}/> Delivery details</h2><div className="form-grid"><label>Full name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></label><label>Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></label><label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></label><label>City<input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} /></label><label className="full">Address<input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /></label><label>PIN code<input value={form.pincode} onChange={e=>setForm({...form,pincode:e.target.value})} /></label></div><h2><CreditCard size={20}/> Payment method</h2><div className="payment-options"><button className={method==='cod'?'payment active':'payment'} onClick={()=>setMethod('cod')}>Cash on Delivery</button><button className={method==='online'?'payment active':'payment'} onClick={()=>setMethod('online')}>Online payment</button></div>{method==='online'&&<p className="notice">Online payment is prepared for gateway integration. Add your payment provider keys before accepting live payments.</p>}</section><aside className="checkout-card summary"><h2>Order summary</h2>{items.map(p=><div className="summary-row" key={p.id}><span>{p.name} × {cart[p.id]}</span><strong>{money(p.price*cart[p.id])}</strong></div>)}<hr/><div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div className="summary-row"><span>Shipping</span><strong>{shipping===0?'FREE':money(shipping)}</strong></div><div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div><button className="checkout" onClick={submit}>Place order · {money(total)}</button></aside></div>}</main>;
}
