import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useHeaderHeight } from '@react-navigation/elements';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import theme from '../theme';

export default function ScreenContainer({
  children,
  style,
  edges: edgesProp,
  backgroundColor = theme.colors.background,
  statusBarStyle,
}) {
  const headerHeight = useHeaderHeight();
  const tabBarHeightCtx = React.useContext(BottomTabBarHeightContext);
  const tabBarHeight = tabBarHeightCtx ?? 0;

  const edges = useMemo(() => {
    if (edgesProp != null) return edgesProp;
    const next = ['left', 'right'];
    if (headerHeight === 0) next.push('top');
    if (tabBarHeight === 0) next.push('bottom');
    return next;
  }, [edgesProp, headerHeight, tabBarHeight]);

  return (
    <SafeAreaView edges={edges} style={[{ flex: 1, backgroundColor }, style]}>
      {statusBarStyle ? <StatusBar style={statusBarStyle} /> : null}
      {children}
    </SafeAreaView>
  );
}
