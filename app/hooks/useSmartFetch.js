"use client";
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function useSmartFetch(fetchAction, selector, cacheTime = 5 * 60 * 1000) { // 5 minutes default
  const dispatch = useDispatch();
  const data = useSelector(selector);
  const lastFetchRef = useRef(0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const now = Date.now();
    const shouldFetch = 
      isInitialMount.current || 
      !data.lastFetched || 
      (now - data.lastFetched) > cacheTime ||
      (data.loading === false && data.error === null && 
       ((Array.isArray(data.orders) && data.orders.length === 0) ||
        (Array.isArray(data.products) && data.products.length === 0) ||
        (data.stats && Object.keys(data.stats).length === 0)));

    if (shouldFetch && !data.loading) {
      lastFetchRef.current = now;
      dispatch(fetchAction());
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, [dispatch, fetchAction, data, cacheTime]);

  return data;
} 