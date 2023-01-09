import React from 'react';
import { ListRenderItem } from 'react-native';

import { RevisitCard } from '../RevisitCard';

import { Revisit } from '../../../interfaces/revisits';

export const renderItem: ListRenderItem<Revisit> = ({ item }) => {
    return (<RevisitCard revisit={ item } />);
}